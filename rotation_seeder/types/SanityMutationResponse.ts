export type SanityMutationResponse = {
    transactionId: string
    results: {
        id: string,
        operation: string
    }[]
}