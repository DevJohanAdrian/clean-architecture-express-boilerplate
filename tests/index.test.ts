import env from '../src/presentation/express/config/envs';
import {Server} from '../src/presentation/express/server'

vi.mock("../src/presentation/express/server")

describe('Should call the server with parameters and start', ()=>{
    test('Should work', async()=>{
        //Act
        await import('../src/index')
        //Assert
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: env.PORT,
            // public_path:
            routes: expect.any(Function)
        });

        expect(Server.prototype.start).toHaveBeenCalledWith();
    })
})