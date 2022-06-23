import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { EsamwadSchoolDto } from "src/common-dto/diksha-school.dto";
@Injectable()
export class EsamwadSchoolService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v1/school`;

  public async getAllSchool() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: this.url,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVVdzVZdVFWNnd2R29PdmZYNHBxWTdwS18zbyJ9.eyJhdWQiOiJmMGRkYjNmNi0wOTFiLTQ1ZTQtOGMwZi04ODlmODlkNGY1ZGEiLCJleHAiOjE2NTg5NzI5NDMsImlhdCI6MTY1NTM3Mjk0MywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI2ZmU0N2RhNi1iNTM4LTRmN2UtYjI1Zi0xMTFiNWNmYWFkNWUiLCJqdGkiOiIxM2QwNzBjZC01NDA3LTQ1Y2UtYTA4Mi00NDQwOGIyYjZlMGYiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoicHJhZ3lhQHNhbWFncmFnb3Zlcm5hbmNlLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjExMCIsImFwcGxpY2F0aW9uSWQiOiJmMGRkYjNmNi0wOTFiLTQ1ZTQtOGMwZi04ODlmODlkNGY1ZGEiLCJyb2xlcyI6WyJzY2hvb2wiXSwidXNlckRhdGEiOnsiRkNNLnRva2VuIjoiZkludkVITDJTRjZ2U2ItSk90UFZfMTpBUEE5MWJGTlR3ZjZkck1NeW9nMDh1OG9zN3lSNXhWNklZRGlpaE15OVhZWnJrUFBnN1RrUUoyOEp0WURBbndhN0RoNGRWVml2MGJaS2QxT0F2VVBIbldQWWpCS2JnVDJSR2N1V25GMVlaMlhId3c0VkZOVk1KT3FjVVBsQjVsb0FIQTlOajZ1Z3h6ViIsImFjY291bnROYW1lIjoiU2Fsb25pIENoYXVkaHJ5IiwiZjBkZGIzZjYtMDkxYi00NWU0LThjMGYtODg5Zjg5ZDRmNWRhIjp7InJvbGVJZCI6IjVlZTlkN2U2ZTY4MDZlNzZhODU1MTk0OCJ9LCJqb2luaW5nRGF0ZSI6IkREL01NL1lZWVkiLCJwaG9uZSI6Ijk4NzE4NjkzMjQiLCJzY2hvb2wiOjEyOTgsInVkaXNlIjoiMTEwIn0sImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJzY2hvb2wiLCJ0ZWFjaGVyIiwiQWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoic2Nob29sIiwiWC1IYXN1cmEtVXNlci1JZCI6IjExMCIsIlgtSGFzdXJhLUxvZ2luLUlkIjoiNmZlNDdkYTYtYjUzOC00ZjdlLWIyNWYtMTExYjVjZmFhZDVlIiwiWC1IYXN1cmEtU2Nob29sLUlkIjoiMTI5OCIsIlgtSGFzdXJhLVVkaXNlLUlkIjoiMTEwIn0sInBvbGljeSI6ImVzYW13YWQifQ.X-alF7HzT7trETqH3asnoFZS10nGu-jcGJ120VMQPTFQOaypWE69jm7HztvK8Tghned12dGOBxf3NlTRBDvReJKWmUpgnjxM1Uuqgvbq7RSEpMYEpKJ5JkAJ26s7_5EXOdBvzUP7bVSuUx4Wc779vRMR4BPZkLiQE_EYC9pPymATkF6lUAWr3-Fhm_1eTYdPC3BzWMfOYQsKlInWp8A0XfSy3oP1zo-iSS6AkJUgLQ_9rZA2rOIb0FqWINRn_amhu77TF2G3CLNPvtgV0m49xKpHN1i1s9L1-7ZnqK3WgIxRMBGSF5GUaNuJd1BmqU_wWAE3U6oA-XHaLCSFQoJozg",
      },
    };

    const response = await axios(config);
    const responseData = response.data.data;
    console.log(responseData);

    const responsedata = new EsamwadSchoolDto(responseData);

    console.log(responsedata);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }
}
