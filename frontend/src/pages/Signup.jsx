import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form))
      .unwrap()
      .then(() => navigate("/login"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-slate-800 p-6 rounded w-full max-w-sm space-y-3"
      >
        <h2 className="text-xl font-bold">Signup</h2>

        <input
          placeholder="Name"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="bg-green-600 w-full py-2 rounded"
        >
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
