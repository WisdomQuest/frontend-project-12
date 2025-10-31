export const CircleAvatar = ({ src, alt }) => {
  return (
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <img src={src} className="rounded-circle" alt={alt} />
    </div>
  )
}
