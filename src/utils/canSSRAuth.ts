import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'


//funções acessíveis apenas para users logados
export const canSSRAuth = <P>(fn: GetServerSideProps<P>) => {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)
        const token = cookies['@loreju.token']

        if(!token){
            return{
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(ctx, '@loreju.token')
                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }
}