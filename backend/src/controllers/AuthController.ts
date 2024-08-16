import { Request, ResponseToolkit } from "@hapi/hapi"

export const login = async (req: Request, res: ResponseToolkit) => {
    try {
        return res.response('Success').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}

export const register = async (req: Request, res: ResponseToolkit) => {
    try {
        const { name, email, password } = req.payload as { name: string, email: string, password: string }
        return res.response('Success').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}