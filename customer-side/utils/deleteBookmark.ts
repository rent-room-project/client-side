export default async function deleteBookmark(lodgingId: string) {
  await $fetch(`/api/bookmarks/${lodgingId}`, {
    method: "DELETE",
    headers: {
      access_token: localStorage.access_token,
    },
  });
}
