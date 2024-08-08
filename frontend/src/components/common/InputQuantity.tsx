import { memo, useEffect, useMemo, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { HiMiniMinus } from "react-icons/hi2";

type Props = {
	maxTotal?: number;
	getValue?: (value: number) => void;
	defaultValue?: number;
};

const InputQuantity = ({
	maxTotal = Infinity,
	getValue,
	defaultValue = 1,
}: Props) => {
	const elementRef = useRef<{
		minus: HTMLElement | null;
		plus: HTMLElement | null;
		input: HTMLInputElement | null;
	}>({
		minus: null,
		plus: null,
		input: null,
	});

	const updateButtonStates = (value: number) => {
		const { input, minus, plus } = elementRef.current;
		if (!input || !minus || !plus) return;

		toggleButtonState(plus, value >= maxTotal);
		toggleButtonState(minus, value <= 1);
	};

	const toggleButtonState = (button: HTMLElement, disable: boolean) => {
		if (disable) {
			button.classList.add("pointer-events-none", "opacity-60");
		} else {
			button.classList.remove("pointer-events-none", "opacity-60");
		}
	};

	const handleChangeInput = () => {
		const inputValue = Number(elementRef.current.input?.value);
		if (inputValue > maxTotal) {
			elementRef.current.input!.value = String(maxTotal);
		} else if (inputValue < 1) {
			elementRef.current.input!.value = String(1);
		}
		updateButtonStates(inputValue);
		getValue?.(inputValue);
	};

	const handleMinusClick = () => {
		const input = elementRef.current.input;
		if (input && Number(input.value) > 1) {
			input.value = String(Number(input.value) - 1);
			handleChangeInput();
		}
	};

	const handlePlusClick = () => {
		const input = elementRef.current.input;
		if (input && Number(input.value) < maxTotal) {
			input.value = String(Number(input.value) + 1);
			handleChangeInput();
		}
	};
	useMemo(() => {
		getValue?.(defaultValue);
	}, []);
	useEffect(() => {
		updateButtonStates(defaultValue);
	}, [defaultValue, getValue, maxTotal]);

	return (
		<div className="flex items-center border border-gray-200 rounded w-full max-w-32">
			<div
				ref={(e) => (elementRef.current.minus = e)}
				onClick={handleMinusClick}
				className="p-0.5 md:p-2 border-r border-gray-200 cursor-pointer"
			>
				<HiMiniMinus />
			</div>
			<input
				max={maxTotal}
				defaultValue={defaultValue}
				ref={(e) => (elementRef.current.input = e)}
				onChange={handleChangeInput}
				type="number"
				className="flex-1 h-full w-10 md:w-16 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			/>
			<div
				ref={(e) => (elementRef.current.plus = e)}
				onClick={handlePlusClick}
				className="p-0.5 md:p-2 border-l border-gray-200 cursor-pointer"
			>
				<GoPlus />
			</div>
		</div>
	);
};

export default memo(InputQuantity);
