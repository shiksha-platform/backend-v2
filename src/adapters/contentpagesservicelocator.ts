import { ContentPagesDto } from "src/contentPages/dto/contentPages.dto";

export interface IServicelocator {
    createContentPage(request: any, createContentPage: ContentPagesDto);
    getContentPageData(contentPageSlug: string, request: any);
    getContentPagesSet(request: any, limit?: number, offset?: number);
    updateContentPageData(
        contentPageId: string,
        request: any,
        contentPageData: ContentPagesDto
    );
    deleteContentPage(contentPageId: string, request: any);
}
