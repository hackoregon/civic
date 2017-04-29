/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import notifier from 'node-notifier';
import colors from 'colors/safe';

export default function logger(msg) {
  const title = `${msg.title.toUpperCase()}`;
  const txt   = `==> ${title} -> ${msg.body}`;
  const type  = msg.type || 'info';

  if (msg.notify) {
    notifier.notify({
      title,
      message: msg.body,
    });
  }

  switch (type) {
    case 'error': console.log(colors.red(txt)); break;
    case 'warn': console.log(colors.yellow(txt)); break;
    case 'info':
    default: console.log(colors.blue(txt));
  }
}
