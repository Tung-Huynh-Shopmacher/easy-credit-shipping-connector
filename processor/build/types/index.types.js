'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isHttpError = isHttpError;
function isHttpError(error) {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const hasRequiredString = (key) => typeof error[key] === 'string';
  return typeof error === 'object' && hasRequiredString('name');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvaW5kZXgudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFzQ0Esa0NBU0M7QUFURCxTQUFnQixXQUFXLENBQUMsS0FBYztJQUN4QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDaEQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQ3hDLE9BQVEsS0FBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsQ0FBQztJQUUxQyxPQUFPLE9BQVEsS0FBYSxLQUFLLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6RSxDQUFDIn0=
