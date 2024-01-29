export function textFromMailTo (mailtoLink: string) {
  return mailtoLink.replace('mailto:', '')
}
