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
  <div style={{ display: "flex", justifyContent: "center" }}>
    <pre>{hypnotoad}</pre>
  </div>
);
