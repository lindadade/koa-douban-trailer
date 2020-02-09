// const {
//   controller,
//   get,
//   post,
//   put,
//   auth,
//   admin,
//   required
// } = require('../lib/decorator')
// const {
//   checkPassword
// } = require('../service/user')
// const {
//   getAllMovies,
// } = require('../service/movie')
//
// @controller('/admin')
// export class adminController {
//   @get('/movie/list')
//   @auth
//   @admin('admin')
//   async getMovies(ctx, next) {
//     const movies = await getAllMovies()
//
//     ctx.body = {
//       success: true,
//       data: movies
//     }
//   }
//
//   @post('/login')
//   @required({
//     body: ['email', 'password']
//   })
//   async login(ctx, next) {
//     const { email, password } = ctx.request.body
//     const matchData = await checkPassword(email, password)
//
//     if (!matchData.user) {
//       return (ctx.body = {
//         success: false,
//         err: '用户不存在'
//       })
//     }
//
//     if (matchData.match) {
//       return (ctx.body = {
//         success: true
//       })
//     }
//
//     return (ctx.body = {
//       success: false,
//       err: '密码不正确'
//     })
//   }
// }

const {
    controller,
    get,
    post,
    put,
    del,
    auth,
    admin,
    required
} = require('../lib/decorator')
const {
    checkPassword
} = require('../service/user')
const {
    getAllMovies,
    findAndRemove
} = require('../service/movie')

@controller('/admin')
export class adminController {
    @get('/movie/list')
    @auth // 判断是否登录的中间件
    @admin('admin')
    async getMovieList(ctx, next) {
        const movies = await getAllMovies()

        ctx.body = {
            success: true,
            data:movies
        }
    };

    @del('/movies')
    @required({
      query: ['id']
    })
    async remove (ctx, next) {
      const id = ctx.query.id
      const movie = await findAndRemove(id)
      const movies = await getAllMovies()

      ctx.body = {
        data: movies,
        success: true
      }
    };

    @post('/login')
    @required({
        body: ['email','password']
    })
    async login(ctx, next) {
        const {
            email,
            password
        } = ctx.request.body
        // console.log(email,password)
        const matchData = await checkPassword(email, password)
        // console.log(matchData)

        if(!matchData.user){
            return (ctx.body={
                success:false,
                err: '用户不存在'
            })
        }

        if(matchData.match){
            ctx.session.user = {
                _id: matchData.user._id,
                email: matchData.user.email,
                role: matchData.user.role,
                username: matchData.user.username
            }

            return (ctx.body = {
                success:true
            })
        }

        return (ctx.body={
            success:false,
            err:'密码不正确'
        })
    }
}
