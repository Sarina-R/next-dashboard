import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      setError("");
      await axios.post("/api/auth/register", formData);
      router.push("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h1 className="text-xl font-semibold text-center">Sign Up</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mt-4 px-4 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mt-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mt-4 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
