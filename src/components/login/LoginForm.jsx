export default function LoginForm() {
    return (
        <form>
        <div className="mb-2 text-start position-relative">
          <input type="email" className="form-control ps-3" id="email" placeholder="Email" />
          <i className="bi bi-envelope-fill icon-input" />
        </div>
        <div className="mb-3 mt-4 text-start position-relative">
          <input type="password" className="form-control ps-3" id="password" placeholder="Password" />
          <i className="bi bi-lock-fill icon-input" />
        </div>
        <button type="submit" className="btn login-btn rounded-pill mt-4">Login</button>
        <div className="mt-3">
          <a href="#" className="text-danger text-decoration-none forget-link">Forget your password?</a>
        </div>
      </form>
    );
  }
  