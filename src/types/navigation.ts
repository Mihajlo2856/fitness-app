import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    App: NavigatorScreenParams<TabParamList>;
    ActiveWorkout: undefined;
    Login: undefined;
    Register: undefined;
};

export type TabParamList = {
    Train: undefined;
    Plan: undefined;
    Progress: undefined;
};