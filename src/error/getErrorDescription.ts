const errorDescriptions = {
  'Invalid username or email address': `
Couldn't log into Facebook.
Check your username/email address, it may be incorrect.
`,
  'Invalid username or password': `
Couldn't log into Facebook.
Check your password or preferrably, use an app password:
http://facebook.com/settings?tab=security&section=per_app_passwords&view
`,
  'Incorrect login details were provided.': `
Couldn't log into Discord.
Check your token.
(it shouldn't be client ID nor anything else that doesn't have "token" in its name)
`,
  EPIPE: `
Current session was invalidated in Facebook settings.
Remove file session.json and restart Miscord.
`,
  'User must verify their account': (err: any) => `
Verify your account here: ${err.errorData.url as string}
Account: ${err.requestArgs.email as string}
  `
}

export default function getErrorDescription (err: Error): string | null {
  const entry = Object.entries(errorDescriptions)
    .find(([ message ]) => err.message.includes(message))

  if (!entry) return null
  const desc = entry[1]

  if (typeof desc === 'string') return desc
  else return desc(err)
}
