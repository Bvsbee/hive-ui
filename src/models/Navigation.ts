export type AuthStackParamList = {
  Startup: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  List: undefined;
};

export type ListStackParamList = {
  ListScreen: undefined;
  ListDetailScreen: { listGuid: string; listName: string };
};