import { useState, useRef } from "react";

const useForm = ({ initialState }) => {
	const [formData, setFormData] = useState(initialState);
	const [formErrors, setFormErrors] = useState(initialState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const errorRef = useRef({});

	return {
		formData,
		setFormData,
		formErrors,
		setFormErrors,
		isSubmitting,
		setIsSubmitting,
		errorRef
	};
};

export default useForm;
