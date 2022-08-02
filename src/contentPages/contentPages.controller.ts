import {
  Controller,
  Inject,
} from "@nestjs/common";
import { IServicelocator } from "src/adapters/contentpagesservicelocator";
import {
  ContentPagesEsamwadService,
  ESamwadContentPagesToken,
} from "src/adapters/esamwad/contentPages.adapter";

@Controller('contentPages')
export class ContentPagesController {
  constructor(private hasuraService: ContentPagesEsamwadService,
  @Inject(ESamwadContentPagesToken) private eSamwadProvider: IServicelocator) { }

  //to get content pages set with limit and offset


  //to retreive details about a given content page

  
  //to create a content page

}
