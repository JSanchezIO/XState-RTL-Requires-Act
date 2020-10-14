import { assign, createMachine } from "xstate";

const DEFAULT_ERROR_MESSAGE =
  "An unexpected error has occured. Please try again later";

export const createGDPRMachine = (analyticsService) => {
  return createMachine(
    {
      context: {},
      id: "gdpr",
      initial: "initializing",
      states: {
        initializing: {
          invoke: {
            id: "initialize",
            onDone: [
              {
                cond: "isOptedIn",
                target: "optingIn"
              },
              {
                cond: "isOptedOut",
                target: "optingOut"
              },
              {
                target: "pendingResponse"
              }
            ],
            onError: {
              actions: "addError",
              target: "failed"
            },
            src: "initialize"
          }
        },
        failed: {
          type: "final"
        },
        pendingResponse: {
          on: {
            OPT_IN: {
              target: "optingIn"
            },
            OPT_OUT: {
              target: "optingOut"
            }
          }
        },
        optingIn: {
          invoke: {
            id: "optIn",
            onDone: {
              target: "optedIn"
            },
            onError: {
              actions: "addError",
              target: "failed"
            },
            src: "optIn"
          }
        },
        optedIn: {
          type: "final"
        },
        optingOut: {
          invoke: {
            id: "optOut",
            onDone: {
              target: "optedOut"
            },
            onError: {
              actions: "addError",
              target: "failed"
            },
            src: "optOut"
          }
        },
        optedOut: {
          type: "final"
        }
      }
    },
    {
      actions: {
        addError: assign({
          error: DEFAULT_ERROR_MESSAGE
        })
      },
      guards: {
        isOptedIn: (_, event) => {
          if (event.type !== "done.invoke.initialize") {
            return false;
          }

          return event.data?.optInStatus === "optedIn";
        },
        isOptedOut: (_, event) => {
          if (event.type !== "done.invoke.initialize") {
            return false;
          }

          return event.data?.optInStatus === "optedOut";
        }
      },
      services: {
        initialize: async () => {
          const optInStatus = await analyticsService.getOptInStatus();

          return { optInStatus };
        },
        optIn: analyticsService.optIn,
        optOut: analyticsService.optOut
      }
    }
  );
};
