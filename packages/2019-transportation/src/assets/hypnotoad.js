import React from "react";

const hypnotoad = `
> library(cowsay)
> say("Civic Software Foundation", by = "hypnotoad")


 -----
Civic Software Foundation
 ------
    \\          ,'\`\`.._   ,'\`\`.
     \\        :,--._:)\\,:,._,.:
      \\       :\`--
},''   :\`...';\\
               \`,'       \`---'  \`.
               /                 :
              /                   \\
            ,'                     :\\.___,-.
           \`...,---'\`\`\`\`\`\`-..._    |:       \\
             (                 )   ;:    )   \\  _,-.
              \`.              (   //          \`'    \\
               :               \`.//  )      )     , ;
             ,-|\`.            _,'/       )    ) ,' ,'
            (  :\`.\`-..____..=:.-':     .     _,' ,'
             \`,'\\ \`\`--....-)='    \`._,  \\  ,') _ '\`\`._
          _.-/ _ \`.       (_)      /     )' ; / \\ \\\`-.'
         \`--(   \`-:\`.     \`' ___..'  _,-'   |/   \`.)
             \`-. \`.\`.\`\`-----\`\`--,  .'
               |/\`.\\\`'        ,','); SSt
                   \`         (/  (/

>
`;

export default () => (
  <div
    style={{
      color: "white",
      display: "flex",
      fontWeight: 700,
      justifyContent: "center",
      backgroundColor: "#462263",
      margin: "-320px -24px 0 -24px"
    }}
  >
    <pre>{hypnotoad}</pre>
  </div>
);
