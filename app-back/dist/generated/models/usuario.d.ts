import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model usuario
 *
 */
export type usuarioModel = runtime.Types.Result.DefaultSelection<Prisma.$usuarioPayload>;
export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null;
    _avg: UsuarioAvgAggregateOutputType | null;
    _sum: UsuarioSumAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
};
export type UsuarioAvgAggregateOutputType = {
    id: number | null;
};
export type UsuarioSumAggregateOutputType = {
    id: number | null;
};
export type UsuarioMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    nombre: string | null;
    apellido: string | null;
    direccion: string | null;
};
export type UsuarioMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    nombre: string | null;
    apellido: string | null;
    direccion: string | null;
};
export type UsuarioCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    nombre: number;
    apellido: number;
    direccion: number;
    _all: number;
};
export type UsuarioAvgAggregateInputType = {
    id?: true;
};
export type UsuarioSumAggregateInputType = {
    id?: true;
};
export type UsuarioMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    apellido?: true;
    direccion?: true;
};
export type UsuarioMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    apellido?: true;
    direccion?: true;
};
export type UsuarioCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    nombre?: true;
    apellido?: true;
    direccion?: true;
    _all?: true;
};
export type UsuarioAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which usuario to aggregate.
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuarioOrderByWithRelationInput | Prisma.usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType;
};
export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsuario[P]> : Prisma.GetScalarType<T[P], AggregateUsuario[P]>;
};
export type usuarioGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuarioWhereInput;
    orderBy?: Prisma.usuarioOrderByWithAggregationInput | Prisma.usuarioOrderByWithAggregationInput[];
    by: Prisma.UsuarioScalarFieldEnum[] | Prisma.UsuarioScalarFieldEnum;
    having?: Prisma.usuarioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuarioCountAggregateInputType | true;
    _avg?: UsuarioAvgAggregateInputType;
    _sum?: UsuarioSumAggregateInputType;
    _min?: UsuarioMinAggregateInputType;
    _max?: UsuarioMaxAggregateInputType;
};
export type UsuarioGroupByOutputType = {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    _count: UsuarioCountAggregateOutputType | null;
    _avg: UsuarioAvgAggregateOutputType | null;
    _sum: UsuarioSumAggregateOutputType | null;
    _min: UsuarioMinAggregateOutputType | null;
    _max: UsuarioMaxAggregateOutputType | null;
};
type GetUsuarioGroupByPayload<T extends usuarioGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsuarioGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsuarioGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsuarioGroupByOutputType[P]>;
}>>;
export type usuarioWhereInput = {
    AND?: Prisma.usuarioWhereInput | Prisma.usuarioWhereInput[];
    OR?: Prisma.usuarioWhereInput[];
    NOT?: Prisma.usuarioWhereInput | Prisma.usuarioWhereInput[];
    id?: Prisma.IntFilter<"usuario"> | number;
    email?: Prisma.StringFilter<"usuario"> | string;
    password?: Prisma.StringFilter<"usuario"> | string;
    nombre?: Prisma.StringFilter<"usuario"> | string;
    apellido?: Prisma.StringFilter<"usuario"> | string;
    direccion?: Prisma.StringFilter<"usuario"> | string;
};
export type usuarioOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    apellido?: Prisma.SortOrder;
    direccion?: Prisma.SortOrder;
    _relevance?: Prisma.usuarioOrderByRelevanceInput;
};
export type usuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.usuarioWhereInput | Prisma.usuarioWhereInput[];
    OR?: Prisma.usuarioWhereInput[];
    NOT?: Prisma.usuarioWhereInput | Prisma.usuarioWhereInput[];
    password?: Prisma.StringFilter<"usuario"> | string;
    nombre?: Prisma.StringFilter<"usuario"> | string;
    apellido?: Prisma.StringFilter<"usuario"> | string;
    direccion?: Prisma.StringFilter<"usuario"> | string;
}, "id" | "email">;
export type usuarioOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    apellido?: Prisma.SortOrder;
    direccion?: Prisma.SortOrder;
    _count?: Prisma.usuarioCountOrderByAggregateInput;
    _avg?: Prisma.usuarioAvgOrderByAggregateInput;
    _max?: Prisma.usuarioMaxOrderByAggregateInput;
    _min?: Prisma.usuarioMinOrderByAggregateInput;
    _sum?: Prisma.usuarioSumOrderByAggregateInput;
};
export type usuarioScalarWhereWithAggregatesInput = {
    AND?: Prisma.usuarioScalarWhereWithAggregatesInput | Prisma.usuarioScalarWhereWithAggregatesInput[];
    OR?: Prisma.usuarioScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usuarioScalarWhereWithAggregatesInput | Prisma.usuarioScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"usuario"> | number;
    email?: Prisma.StringWithAggregatesFilter<"usuario"> | string;
    password?: Prisma.StringWithAggregatesFilter<"usuario"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"usuario"> | string;
    apellido?: Prisma.StringWithAggregatesFilter<"usuario"> | string;
    direccion?: Prisma.StringWithAggregatesFilter<"usuario"> | string;
};
export type usuarioCreateInput = {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
};
export type usuarioUncheckedCreateInput = {
    id?: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
};
export type usuarioUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    apellido?: Prisma.StringFieldUpdateOperationsInput | string;
    direccion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type usuarioUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    apellido?: Prisma.StringFieldUpdateOperationsInput | string;
    direccion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type usuarioCreateManyInput = {
    id?: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
};
export type usuarioUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    apellido?: Prisma.StringFieldUpdateOperationsInput | string;
    direccion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type usuarioUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    apellido?: Prisma.StringFieldUpdateOperationsInput | string;
    direccion?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type usuarioOrderByRelevanceInput = {
    fields: Prisma.usuarioOrderByRelevanceFieldEnum | Prisma.usuarioOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type usuarioCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    apellido?: Prisma.SortOrder;
    direccion?: Prisma.SortOrder;
};
export type usuarioAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usuarioMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    apellido?: Prisma.SortOrder;
    direccion?: Prisma.SortOrder;
};
export type usuarioMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    apellido?: Prisma.SortOrder;
    direccion?: Prisma.SortOrder;
};
export type usuarioSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usuarioSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    apellido?: boolean;
    direccion?: boolean;
}, ExtArgs["result"]["usuario"]>;
export type usuarioSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    nombre?: boolean;
    apellido?: boolean;
    direccion?: boolean;
};
export type usuarioOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "nombre" | "apellido" | "direccion", ExtArgs["result"]["usuario"]>;
export type $usuarioPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "usuario";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        password: string;
        nombre: string;
        apellido: string;
        direccion: string;
    }, ExtArgs["result"]["usuario"]>;
    composites: {};
};
export type usuarioGetPayload<S extends boolean | null | undefined | usuarioDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usuarioPayload, S>;
export type usuarioCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsuarioCountAggregateInputType | true;
};
export interface usuarioDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['usuario'];
        meta: {
            name: 'usuario';
        };
    };
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {usuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuarioFindUniqueArgs>(args: Prisma.SelectSubset<T, usuarioFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuarioFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuarioFindFirstArgs>(args?: Prisma.SelectSubset<T, usuarioFindFirstArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuarioFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     *
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     *
     */
    findMany<T extends usuarioFindManyArgs>(args?: Prisma.SelectSubset<T, usuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Usuario.
     * @param {usuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     *
     */
    create<T extends usuarioCreateArgs>(args: Prisma.SelectSubset<T, usuarioCreateArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Usuarios.
     * @param {usuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends usuarioCreateManyArgs>(args?: Prisma.SelectSubset<T, usuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Usuario.
     * @param {usuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     *
     */
    delete<T extends usuarioDeleteArgs>(args: Prisma.SelectSubset<T, usuarioDeleteArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Usuario.
     * @param {usuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends usuarioUpdateArgs>(args: Prisma.SelectSubset<T, usuarioUpdateArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Usuarios.
     * @param {usuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends usuarioDeleteManyArgs>(args?: Prisma.SelectSubset<T, usuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends usuarioUpdateManyArgs>(args: Prisma.SelectSubset<T, usuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Usuario.
     * @param {usuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends usuarioUpsertArgs>(args: Prisma.SelectSubset<T, usuarioUpsertArgs<ExtArgs>>): Prisma.Prisma__usuarioClient<runtime.Types.Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuarioCountArgs>(args?: Prisma.Subset<T, usuarioCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsuarioCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Prisma.Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>;
    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends usuarioGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usuarioGroupByArgs['orderBy'];
    } : {
        orderBy?: usuarioGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the usuario model
     */
    readonly fields: usuarioFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for usuario.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__usuarioClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the usuario model
 */
export interface usuarioFieldRefs {
    readonly id: Prisma.FieldRef<"usuario", 'Int'>;
    readonly email: Prisma.FieldRef<"usuario", 'String'>;
    readonly password: Prisma.FieldRef<"usuario", 'String'>;
    readonly nombre: Prisma.FieldRef<"usuario", 'String'>;
    readonly apellido: Prisma.FieldRef<"usuario", 'String'>;
    readonly direccion: Prisma.FieldRef<"usuario", 'String'>;
}
/**
 * usuario findUnique
 */
export type usuarioFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter, which usuario to fetch.
     */
    where: Prisma.usuarioWhereUniqueInput;
};
/**
 * usuario findUniqueOrThrow
 */
export type usuarioFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter, which usuario to fetch.
     */
    where: Prisma.usuarioWhereUniqueInput;
};
/**
 * usuario findFirst
 */
export type usuarioFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter, which usuario to fetch.
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuarioOrderByWithRelationInput | Prisma.usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for usuarios.
     */
    cursor?: Prisma.usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of usuarios.
     */
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
/**
 * usuario findFirstOrThrow
 */
export type usuarioFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter, which usuario to fetch.
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuarioOrderByWithRelationInput | Prisma.usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for usuarios.
     */
    cursor?: Prisma.usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of usuarios.
     */
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
/**
 * usuario findMany
 */
export type usuarioFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter, which usuarios to fetch.
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of usuarios to fetch.
     */
    orderBy?: Prisma.usuarioOrderByWithRelationInput | Prisma.usuarioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing usuarios.
     */
    cursor?: Prisma.usuarioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` usuarios.
     */
    skip?: number;
    distinct?: Prisma.UsuarioScalarFieldEnum | Prisma.UsuarioScalarFieldEnum[];
};
/**
 * usuario create
 */
export type usuarioCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * The data needed to create a usuario.
     */
    data: Prisma.XOR<Prisma.usuarioCreateInput, Prisma.usuarioUncheckedCreateInput>;
};
/**
 * usuario createMany
 */
export type usuarioCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: Prisma.usuarioCreateManyInput | Prisma.usuarioCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * usuario update
 */
export type usuarioUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * The data needed to update a usuario.
     */
    data: Prisma.XOR<Prisma.usuarioUpdateInput, Prisma.usuarioUncheckedUpdateInput>;
    /**
     * Choose, which usuario to update.
     */
    where: Prisma.usuarioWhereUniqueInput;
};
/**
 * usuario updateMany
 */
export type usuarioUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: Prisma.XOR<Prisma.usuarioUpdateManyMutationInput, Prisma.usuarioUncheckedUpdateManyInput>;
    /**
     * Filter which usuarios to update
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * Limit how many usuarios to update.
     */
    limit?: number;
};
/**
 * usuario upsert
 */
export type usuarioUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * The filter to search for the usuario to update in case it exists.
     */
    where: Prisma.usuarioWhereUniqueInput;
    /**
     * In case the usuario found by the `where` argument doesn't exist, create a new usuario with this data.
     */
    create: Prisma.XOR<Prisma.usuarioCreateInput, Prisma.usuarioUncheckedCreateInput>;
    /**
     * In case the usuario was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.usuarioUpdateInput, Prisma.usuarioUncheckedUpdateInput>;
};
/**
 * usuario delete
 */
export type usuarioDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
    /**
     * Filter which usuario to delete.
     */
    where: Prisma.usuarioWhereUniqueInput;
};
/**
 * usuario deleteMany
 */
export type usuarioDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: Prisma.usuarioWhereInput;
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number;
};
/**
 * usuario without action
 */
export type usuarioDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: Prisma.usuarioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the usuario
     */
    omit?: Prisma.usuarioOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=usuario.d.ts.map