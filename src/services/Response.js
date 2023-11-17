// component içerisine döndürülecek alert mesajı.

export default (response, text, status, variant) => ({
  text,
  status,
  variant,
  ...response,
});
