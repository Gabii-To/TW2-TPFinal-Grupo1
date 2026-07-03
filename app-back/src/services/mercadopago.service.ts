import {MercadoPagoConfig, Preference} from "mercadopago";
import env from "env-var";

const client = new MercadoPagoConfig({
    accessToken: env.get("MP_ACCESS_TOKEN").required().asString(),
});

type ItemMP = {
    title: string;
    quantity: number;
    unit_price: number;
};

export class MercadopagoService {
    async crearPreferencia(items: ItemMP[], pedidoId: number) {
        const preference = new Preference(client);
        const front_url = env.get('FRONT_URL').required().asString();
        const response = await preference.create({
            body: {
                items: items as any,
                external_reference: String(pedidoId),
                back_urls: {
                    success: `${front_url}/pago/success`,
                    failure: `${front_url}/pago/failure`,
                    pending: `${front_url}/pago/pending`,
                },
                auto_return: "approved",
            },
        });

        return {
            id: response.id,
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point
        };    }
}