import dotenv from 'dotenv/config';
import env from 'env-var';
export const config = {
    PORT: env.get('PORT').required().asPortNumber(),
    db: env.get('DATABASE_URL').required().asString()
};
//# sourceMappingURL=config.js.map