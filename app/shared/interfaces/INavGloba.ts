
export interface INavGlobal {
    navigation: {
        navigate: (s: string, p?: any) => void
        goBack: () => void
    }
}