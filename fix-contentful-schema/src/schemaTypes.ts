interface GraphQLOfType {
    kind: string,
    name: string | null,
    ofType: GraphQLOfType
}

interface GraphQLField {
    name: string,
    description: string | null,
    args: unknown[],
    type: GraphQLOfType
}

interface GraphQLType {
    kind: string,
    name: string,
    description: string | null,
    fields: GraphQLField[]
}

interface OperationType {
    name: string
}

export interface GraphQLSchema {
    __schema: {
        queryType: OperationType | null,
        mutationType: OperationType | null,
        subscriptionType: OperationType | null,
        types: GraphQLType[],
        // Not needed for this
        directives: unknown[]
    }
}