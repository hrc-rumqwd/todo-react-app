const PRIMITIVE_TYPES = ['number', 'bigint', 'string'] as const;

type PrimitiveTypes = (typeof PRIMITIVE_TYPES)[number];

export const buildQueryString = (params): string => {
  const strBuilder: string[] = [];
  Object.keys(params).map((key) => {
    switch (typeof params[key]) {
      case 'number':
      case 'bigint':
      case 'string':
        strBuilder.push(`${key}=${params[key]}`);
        break;

      case 'object': {
        if (
          Array.isArray(params[key]) &&
          params[key].every((t) =>
            PRIMITIVE_TYPES.includes(typeof t as PrimitiveTypes)
          )
        ) {
          let subQueryString = '';
          params[key].map((item) => {
            subQueryString += `&${key}=${item}`;
          });

          strBuilder.push(subQueryString);
          break;
        }
        strBuilder.push(buildQueryString(params[key]));
        break;
      }
    }
  });
  return strBuilder.join('&');
};
