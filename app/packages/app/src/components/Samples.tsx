import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import useMeasure from "react-use-measure";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import Loading from "./Loading";
import Sample from "./Sample";
import tile from "./Samples.hooks";
import * as atoms from "../recoil/atoms";
import { scrollbarStyles } from "./utils";

const Container = styled.div`
  ${scrollbarStyles}
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

function Samples() {
  const [containerRef, bounds] = useMeasure();

  const [scrollState, setScrollState] = tile();
  const { rows } = useRecoilValue(atoms.gridRows);

  return (
    <Container ref={containerRef}>
      <InfiniteScroll
        className={"sample-grid"}
        pageStart={1}
        initialLoad={true}
        loadMore={() =>
          !scrollState.isLoading && !scrollState.loadMore
            ? setScrollState({ ...scrollState, loadMore: true })
            : null
        }
        hasMore={scrollState.hasMore}
        useWindow={false}
      >
        {rows.map((r, i) => {
          const adjustedWidth = bounds.width - 16 - (r.samples.length - 1) * 4;
          const height = adjustedWidth / r.aspectRatio;
          return (
            <React.Fragment key={i}>
              <Row
                style={{
                  height,
                }}
                key={i}
              >
                {r.samples.map(({ id, aspectRatio }, j) => (
                  <React.Fragment key={j}>
                    <div
                      key={"column"}
                      style={{
                        padding: 0,
                        height: "100%",
                        width: height * aspectRatio,
                      }}
                    >
                      <Sample sampleId={id} />
                    </div>
                  </React.Fragment>
                ))}
              </Row>
            </React.Fragment>
          );
        })}
      </InfiniteScroll>
      {scrollState.isLoading && rows.length === 0 ? <Loading /> : null}
    </Container>
  );
}

export default React.memo(Samples);