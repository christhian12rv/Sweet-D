import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useNonInitialEffect = (effect: EffectCallback, deps?: DependencyList): void => {
	const initialRender = useRef(true);

	useEffect(() => {
		if (initialRender.current)
			initialRender.current = false;
		else
			return effect();
	}, deps);
};