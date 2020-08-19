export const START_WALK_ACTION_TYPE = "START_WALK";
export const START_WALK_SUCCESS_ACTION_TYPE = "START_WALK_SUCCESS";
export const START_WALK_FAILED_ACTION_TYPE = "START_WALK_FAILED";
export const CLEAR_ACTION_QUEUE_ACTION_TYPE = "CLEAR_ACTION_QUEUE";

export function startWalk() {
  return {
    type: START_WALK_ACTION_TYPE,
    meta: {
      retry: true,
      dismiss: CLEAR_ACTION_QUEUE_ACTION_TYPE,
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

export function clearActionQueue() {
  return { type: CLEAR_ACTION_QUEUE_ACTION_TYPE };
}
