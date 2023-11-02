import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import { parseCookies } from 'nookies'

//funções para páginas exclusiva de não logados
export const canSRRGuest = <P>(fn: GetServerSideProps<P>) => {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)
        //caso já logado, o usuário deve ser redirecionado
        if(cookies['@loreju.token']){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return await fn(ctx)
    }
}