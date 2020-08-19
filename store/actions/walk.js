export const START_WALK_ACTION_TYPE = "START_WALK";
export const START_WALK_SUCCESS_ACTION_TYPE = "START_WALK_SUCCESS";
export const START_WALK_FAILED_ACTION_TYPE = "START_WALK_FAILED";

export function startWalk() {
  return {
    type: START_WALK_ACTION_TYPE,
    meta: {
      retry: true,
    },
  };
}

export function startWalkSuccess() {
  return {
    type: START_WALK_SUCCESS_ACTION_TYPE,
  };
}

export function startWalkFailed(error) {
  return {
    type: START_WALK_FAILED_ACTION_TYPE,
    error,
  };
}
