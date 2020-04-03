const invariant = function (condition: boolean, format: string) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    let error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment '
        + 'for the full error message and additional helpful warnings.',
      );
    } else {
      error = new Error(format);
      error.name = 'Invariant Violation';
    }

    throw error;
  }
};

export default invariant;
