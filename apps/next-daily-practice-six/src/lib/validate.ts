import {resolveUrl} from "next/dist/lib/metadata/resolvers/resolve-url";

type IdleState = {
  state: "idle";
};

type LoadingState = {
  state: "loading";
};

type SuccessState = {
  state: "success";
  data: {
    userId: string;
  };
};

type ErrorState = {
  state: "error";
  error: {
    message: string;
    code: number;
  };
};

export type AsyncState =
  | IdleState
  | LoadingState
  | SuccessState
  | ErrorState;

export const renderState = (state: AsyncState): string => {
  switch (state.state) {
    case "idle":
      return "idle";

    case "loading":
      return "loading";

    case "success":
      return `success: ${state.data.userId}`;

    case "error":
      return `error ${state.error.code}: ${state.error.message}`;

    default: {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
    }
  }
};

