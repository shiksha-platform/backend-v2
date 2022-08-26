import { LikeSearchDto } from "src/like/dto/like-search.dto";
import { LikeDto } from "src/like/dto/like.dto";

export interface IServicelocator {
  getLike(likeId: string, request: any);
  createLike(request: any, likeDto: LikeDto);
  updateLike(likeId: string, request: any, likeDto: LikeDto);
  searchLike(request: any, likeSearchDto: LikeSearchDto);
  getCountLike(contextId: string, context: string, request: any);
  deleteLike(likeId: string, request: any);
}
