import defaultSettings from '@/settings'

const title = defaultSettings.title || '不凡乐居'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
