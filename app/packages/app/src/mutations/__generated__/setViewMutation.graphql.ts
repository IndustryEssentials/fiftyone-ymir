/**
 * @generated SignedSource<<55d4376d5e551f52d20d11a23061b07d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from "relay-runtime";
export type MediaType = "image" | "video" | "%future added value";
export type setViewMutation$variables = {
  subscription: string;
  session?: string | null;
  view: Array;
};
export type setViewMutation$data = {
  readonly setView: {
    readonly dataset: {
      readonly id: string;
      readonly name: string;
      readonly mediaType: MediaType | null;
      readonly sampleFields: ReadonlyArray<{
        readonly ftype: string;
        readonly subfield: string | null;
        readonly embeddedDocType: string | null;
        readonly path: string;
        readonly dbField: string | null;
      }>;
      readonly frameFields: ReadonlyArray<{
        readonly ftype: string;
        readonly subfield: string | null;
        readonly embeddedDocType: string | null;
        readonly path: string;
        readonly dbField: string | null;
      }>;
      readonly appSidebarGroups: ReadonlyArray<{
        readonly name: string;
        readonly paths: ReadonlyArray<string>;
      }> | null;
      readonly maskTargets: ReadonlyArray<{
        readonly name: string;
        readonly targets: ReadonlyArray<{
          readonly target: number;
          readonly value: string;
        }>;
      }>;
      readonly defaultMaskTargets: ReadonlyArray<{
        readonly target: number;
        readonly value: string;
      }> | null;
      readonly evaluations: ReadonlyArray<{
        readonly key: string;
        readonly version: string;
        readonly timestamp: string;
        readonly viewStages: ReadonlyArray<string>;
        readonly config: {
          readonly cls: string;
          readonly predField: string;
          readonly gtField: string;
        };
      }>;
      readonly brainMethods: ReadonlyArray<{
        readonly key: string;
        readonly version: string;
        readonly timestamp: string;
        readonly viewStages: ReadonlyArray<string>;
        readonly config: {
          readonly cls: string;
          readonly embeddingsField: string | null;
          readonly method: string;
          readonly patchesField: string | null;
        };
      }>;
      readonly lastLoadedAt: string;
      readonly createdAt: string;
      readonly version: string;
      readonly viewCls: string | null;
      readonly skeletons: ReadonlyArray<{
        readonly name: string;
        readonly labels: ReadonlyArray<string> | null;
        readonly edges: ReadonlyArray<ReadonlyArray<number>>;
      }>;
      readonly defaultSkeleton: {
        readonly labels: ReadonlyArray<string> | null;
        readonly edges: ReadonlyArray<ReadonlyArray<number>>;
      } | null;
    };
    readonly view: Array;
  };
};
export type setViewMutation = {
  variables: setViewMutation$variables;
  response: setViewMutation$data;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "session",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "subscription",
    },
    v2 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "view",
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v4 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "ftype",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "subfield",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "embeddedDocType",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "path",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "dbField",
        storageKey: null,
      },
    ],
    v5 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "target",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "value",
        storageKey: null,
      },
    ],
    v6 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "key",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "version",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "timestamp",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "viewStages",
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "cls",
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "labels",
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "edges",
      storageKey: null,
    },
    v13 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "session",
            variableName: "session",
          },
          {
            kind: "Variable",
            name: "subscription",
            variableName: "subscription",
          },
          {
            kind: "Variable",
            name: "view",
            variableName: "view",
          },
        ],
        concreteType: "ViewResponse",
        kind: "LinkedField",
        name: "setView",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "Dataset",
            kind: "LinkedField",
            name: "dataset",
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "id",
                storageKey: null,
              },
              v3 /*: any*/,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "mediaType",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "SampleField",
                kind: "LinkedField",
                name: "sampleFields",
                plural: true,
                selections: v4 /*: any*/,
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "SampleField",
                kind: "LinkedField",
                name: "frameFields",
                plural: true,
                selections: v4 /*: any*/,
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "SidebarGroup",
                kind: "LinkedField",
                name: "appSidebarGroups",
                plural: true,
                selections: [
                  v3 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "paths",
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "NamedTargets",
                kind: "LinkedField",
                name: "maskTargets",
                plural: true,
                selections: [
                  v3 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: "Target",
                    kind: "LinkedField",
                    name: "targets",
                    plural: true,
                    selections: v5 /*: any*/,
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "Target",
                kind: "LinkedField",
                name: "defaultMaskTargets",
                plural: true,
                selections: v5 /*: any*/,
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "EvaluationRun",
                kind: "LinkedField",
                name: "evaluations",
                plural: true,
                selections: [
                  v6 /*: any*/,
                  v7 /*: any*/,
                  v8 /*: any*/,
                  v9 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: "EvaluationRunConfig",
                    kind: "LinkedField",
                    name: "config",
                    plural: false,
                    selections: [
                      v10 /*: any*/,
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "predField",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "gtField",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "BrainRun",
                kind: "LinkedField",
                name: "brainMethods",
                plural: true,
                selections: [
                  v6 /*: any*/,
                  v7 /*: any*/,
                  v8 /*: any*/,
                  v9 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: "BrainRunConfig",
                    kind: "LinkedField",
                    name: "config",
                    plural: false,
                    selections: [
                      v10 /*: any*/,
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "embeddingsField",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "method",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "patchesField",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "lastLoadedAt",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "createdAt",
                storageKey: null,
              },
              v7 /*: any*/,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "viewCls",
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "NamedKeypointSkeleton",
                kind: "LinkedField",
                name: "skeletons",
                plural: true,
                selections: [v3 /*: any*/, v11 /*: any*/, v12 /*: any*/],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "KeypointSkeleton",
                kind: "LinkedField",
                name: "defaultSkeleton",
                plural: false,
                selections: [v11 /*: any*/, v12 /*: any*/],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "view",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "setViewMutation",
      selections: v13 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: "Operation",
      name: "setViewMutation",
      selections: v13 /*: any*/,
    },
    params: {
      cacheID: "eab956618e91f79dd9a3e19c44252dfc",
      id: null,
      metadata: {},
      name: "setViewMutation",
      operationKind: "mutation",
      text:
        "mutation setViewMutation(\n  $subscription: String!\n  $session: String\n  $view: JSONArray!\n) {\n  setView(subscription: $subscription, session: $session, view: $view) {\n    dataset {\n      id\n      name\n      mediaType\n      sampleFields {\n        ftype\n        subfield\n        embeddedDocType\n        path\n        dbField\n      }\n      frameFields {\n        ftype\n        subfield\n        embeddedDocType\n        path\n        dbField\n      }\n      appSidebarGroups {\n        name\n        paths\n      }\n      maskTargets {\n        name\n        targets {\n          target\n          value\n        }\n      }\n      defaultMaskTargets {\n        target\n        value\n      }\n      evaluations {\n        key\n        version\n        timestamp\n        viewStages\n        config {\n          cls\n          predField\n          gtField\n        }\n      }\n      brainMethods {\n        key\n        version\n        timestamp\n        viewStages\n        config {\n          cls\n          embeddingsField\n          method\n          patchesField\n        }\n      }\n      lastLoadedAt\n      createdAt\n      version\n      viewCls\n      skeletons {\n        name\n        labels\n        edges\n      }\n      defaultSkeleton {\n        labels\n        edges\n      }\n    }\n    view\n  }\n}\n",
    },
  };
})();

(node as any).hash = "a9b8d05dcbd77ea49637588c20dd0971";

export default node;