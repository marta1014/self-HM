// 文章请求
import request from '../utils/request'
import {
  API_ARTICLES,
  API_CHANNELS
} from '../api/api'
export const getArticles = params => request({// 获取文章
  url: API_ARTICLES,
  params
})

export const getChannels = () => request({// 获取频道
  url: API_CHANNELS
})

// export const delArticles = id => request({// 获取频道
//   url: API_DELARTICLES + `/${id.toString()}`,
//   method: 'delete'
// })
// export const getArtId = articleId => request({// 文章详情
//     url: `/app/v1_0/articles/${articleId}`
//   })

// method: 'delete',
//         url: `/articles/${id.toString()}`
