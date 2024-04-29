export default async function addBookmark(lodgingId: string) {
  await $fetch(`/api/bookmarks/${lodgingId}`, {
    method: "POST",
    headers: {
      access_token: localStorage.access_token,
    },
  });
}
