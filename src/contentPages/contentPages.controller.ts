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

  //api calls

}
