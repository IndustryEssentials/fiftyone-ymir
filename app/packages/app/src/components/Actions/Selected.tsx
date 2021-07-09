import React, { MutableRefObject, useLayoutEffect } from "react";
import { RecoilValueReadOnly, useRecoilCallback, useRecoilValue } from "recoil";

import Popout from "./Popout";
import { ActionOption } from "./Common";
import * as atoms from "../../recoil/atoms";
import * as selectors from "../../recoil/selectors";
import socket from "../../shared/connection";
import { packageMessage } from "../../utils/socket";
import { VideoLooker } from "@fiftyone/looker";
import { useEventHandler } from "../../utils/hooks";

const useGridActions = (close: () => void) => {
  const elementNames = useRecoilValue(selectors.elementNames);
  const clearSelection = useRecoilCallback(
    ({ snapshot, set, reset }) => async () => {
      const [oldSelected, state] = await Promise.all([
        snapshot.getPromise(atoms.selectedSamples),
        snapshot.getPromise(atoms.stateDescription),
      ]);
      oldSelected.forEach((s) => reset(atoms.isSelectedSample(s)));
      const newState = JSON.parse(JSON.stringify(state));
      newState.selected = [];
      set(atoms.stateDescription, newState);
      reset(atoms.selectedSamples);
      socket.send(packageMessage("clear_selection", {}));
      close();
    },
    [close]
  );
  const addStage = useRecoilCallback(({ snapshot }) => async (name) => {
    close();
    const state = await snapshot.getPromise(atoms.stateDescription);
    const newState = JSON.parse(JSON.stringify(state));
    const samples = await snapshot.getPromise(atoms.selectedSamples);
    const newView = newState.view || [];
    newView.push({
      _cls: `fiftyone.core.stages.${name}`,
      kwargs: [["sample_ids", Array.from(samples)]],
    });
    newState.view = newView;
    newState.selected = [];
    socket.send(packageMessage("update", { state: newState }));
  });

  return [
    {
      text: `Clear selected ${elementNames.plural}`,
      title: `Deselect all selected ${elementNames.plural}`,
      onClick: clearSelection,
    },
    {
      text: `Only show selected ${elementNames.plural}`,
      title: `Hide all other ${elementNames.plural}`,
      onClick: () => addStage("Select"),
    },
    {
      text: `Hide selected ${elementNames.plural}`,
      title: `Show only unselected ${elementNames.plural}`,
      onClick: () => addStage("Exclude"),
    },
  ];
};

const toLabelMap = (labels: atoms.SelectedLabel[]) =>
  Object.fromEntries(labels.map(({ label_id, ...rest }) => [label_id, rest]));

const useSelectVisible = (
  visibleAtom?: RecoilValueReadOnly<atoms.SelectedLabel[]>,
  visible?: atoms.SelectedLabel[]
) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const selected = await snapshot.getPromise(selectors.selectedLabels);
    visible = visibleAtom ? await snapshot.getPromise(visibleAtom) : visible;
    set(selectors.selectedLabels, {
      ...selected,
      ...toLabelMap(visible),
    });
  });
};

const useUnselectVisible = (
  visibleIdsAtom?: RecoilValueReadOnly<Set<string>>,
  visibleIds?: Set<string>
) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const selected = await snapshot.getPromise(selectors.selectedLabels);
    visibleIds = visibleIdsAtom
      ? await snapshot.getPromise(visibleIdsAtom)
      : visibleIds;

    const filtered = Object.entries(selected).filter(
      ([label_id]) => !visibleIds.has(label_id)
    );
    set(selectors.selectedLabels, Object.fromEntries(filtered));
  });
};

const useClearSelectedLabels = () => {
  return useRecoilCallback(({ set }) => async () =>
    set(selectors.selectedLabels, {})
  );
};

const useHideSelected = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const selected = await snapshot.getPromise(selectors.selectedLabels);
    const hidden = await snapshot.getPromise(atoms.hiddenLabels);
    set(selectors.selectedLabels, {});
    set(atoms.hiddenLabels, { ...hidden, ...selected });
  });
};

const useHideOthers = (
  visibleAtom?: RecoilValueReadOnly<atoms.SelectedLabel[]>,
  visible?: atoms.SelectedLabel[]
) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const selected = await snapshot.getPromise(selectors.selectedLabelIds);
    visible = visibleAtom ? await snapshot.getPromise(visibleAtom) : visible;
    const hidden = await snapshot.getPromise(atoms.hiddenLabels);
    set(atoms.hiddenLabels, {
      ...hidden,
      ...toLabelMap(visible.filter(({ label_id }) => !selected.has(label_id))),
    });
  });
};

const hasSetDiff = <T extends unknown>(a: Set<T>, b: Set<T>): boolean =>
  new Set([...a].filter((e) => !b.has(e))).size > 0;

const hasSetInt = <T extends unknown>(a: Set<T>, b: Set<T>): boolean =>
  new Set([...a].filter((e) => b.has(e))).size > 0;

const useModalActions = (lookerRef, close) => {
  const selectedLabels = useRecoilValue(selectors.selectedLabelIds);
  const visibleSampleLabels = lookerRef.current.getCurrentSampleLabels();
  const isVideo =
    useRecoilValue(selectors.isVideoDataset) &&
    useRecoilValue(selectors.isRootView);
  const visibleFrameLabels = isVideo
    ? lookerRef.current.getCurrentFrameLabels()
    : new Set();

  const closeAndCall = (callback) => {
    return React.useCallback(() => {
      close();
      callback();
    }, []);
  };
  const elementNames = useRecoilValue(selectors.elementNames);

  const hasVisibleUnselected = hasSetDiff(visibleSampleLabels, selectedLabels);
  const hasFrameVisibleUnselected = hasSetDiff(
    visibleFrameLabels,
    selectedLabels
  );
  const hasVisibleSelection = hasSetInt(selectedLabels, visibleSampleLabels);

  return [
    {
      text: `Select visible (current ${elementNames.singular})`,
      hidden: !hasVisibleUnselected,
      onClick: closeAndCall(useSelectVisible(null, visibleSampleLabels)),
    },
    {
      text: `Unselect visible (current ${elementNames.singular})`,
      hidden: !hasVisibleSelection,
      onClick: closeAndCall(
        useUnselectVisible(null, visibleModalSampleLabelIds)
      ),
    },
    isVideo && {
      text: "Select visible (current frame)",
      hidden: !hasFrameVisibleUnselected,
      onClick: closeAndCall(
        useSelectVisible(visibleModalCurrentFrameLabels(frameNumber))
      ),
    },
    isVideo && {
      text: "Unselect visible (current frame)",
      hidden: !hasVisibleSelection,
      onClick: closeAndCall(
        useUnselectVisible(visibleModalCurrentFrameLabelIds(frameNumber))
      ),
    },
    {
      text: "Clear selection",
      hidden: !selectedLabels.size,
      onClick: closeAndCall(useClearSelectedLabels()),
    },
    {
      text: "Hide selected",
      hidden: !selectedLabels.size,
      onClick: closeAndCall(useHideSelected()),
    },
    {
      text: `Hide unselected (current ${elementNames.singular})`,
      hidden: !hasVisibleUnselected,
      onClick: closeAndCall(useHideOthers(visibleModalSampleLabels)),
    },
    isVideo && {
      text: "Hide unselected (current frame)",
      hidden: !hasFrameVisibleUnselected,
      onClick: closeAndCall(
        useHideOthers(visibleModalCurrentFrameLabels(frameNumber))
      ),
    },
  ].filter(Boolean);
};

interface SelectionActionsProps {
  modal: boolean;
  close: () => void;
  lookerRef: MutableRefObject<VideoLooker>;
  bounds: any;
}

const SelectionActions = ({
  modal,
  close,
  lookerRef,
  bounds,
}: SelectionActionsProps) => {
  useLayoutEffect(() => {
    lookerRef &&
      lookerRef.current &&
      lookerRef.current.pause &&
      lookerRef.current.pause();
  });
  const actions = modal
    ? useModalActions(lookerRef, close)
    : useGridActions(close);

  lookerRef && useEventHandler(lookerRef.current, "play", close);

  return (
    <Popout modal={modal} bounds={bounds}>
      {actions.map((props, i) => (
        <ActionOption {...props} key={i} />
      ))}
    </Popout>
  );
};

export default React.memo(SelectionActions);