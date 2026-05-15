import Input from '../ui/Input';

export default function RegistrationStep1({ formData, errors, onChange }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter your full name"
        autoComplete="name"
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />
      <Input
        label="Contact Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        error={errors.phone}
        placeholder="+91 98765 43210"
        autoComplete="tel"
        required
      />
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={onChange}
        error={errors.dob}
        required
      />
    </div>
  );
}
