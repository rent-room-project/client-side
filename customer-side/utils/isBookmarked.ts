export default function isBookmarked(
  bookmarks: Bookmark[],
  lodgingId: string
): boolean {
  return bookmarks.some((bookmark) => bookmark.Lodging.id === lodgingId);
}
