'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.post = void 0;
const custom_error_1 = __importDefault(require('../errors/custom.error'));
const create_client_1 = require('../client/create.client');
const index_types_1 = require('../types/index.types');
// import { customerController } from './customers.controller';
/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { token } = request.body;
    const apiRoot = (0, create_client_1.createApiRoot)();
    try {
      const customer = yield apiRoot
        .customers()
        .emailConfirm()
        .post({
          body: {
            tokenValue: token,
          },
        })
        .execute();
      response.status(200).json(customer);
    } catch (error) {
      if ((0, index_types_1.isHttpError)(error)) {
        throw new custom_error_1.default(
          error.code,
          error.message,
          (_a = error.body) === null || _a === void 0 ? void 0 : _a.errors
        );
      } else {
        throw new custom_error_1.default(500, 'Internal Server Error');
      }
    }
  });
exports.post = post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwRUFBaUQ7QUFDakQsMkRBQXdEO0FBQ3hELHNEQUFtRDtBQUVuRCwrREFBK0Q7QUFFL0Q7Ozs7Ozs7O0dBUUc7QUFDSSxNQUFNLElBQUksR0FBRyxDQUFPLE9BQWdCLEVBQUUsUUFBa0IsRUFBRSxFQUFFOztJQUNqRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUUvQixNQUFNLE9BQU8sR0FBRyxJQUFBLDZCQUFhLEdBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU87YUFDM0IsU0FBUyxFQUFFO2FBQ1gsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDO1lBQ0osSUFBSSxFQUFFO2dCQUNKLFVBQVUsRUFBRSxLQUFLO2FBQ2xCO1NBQ0YsQ0FBQzthQUNELE9BQU8sRUFBRSxDQUFDO1FBRWIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLElBQUEseUJBQVcsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxzQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFBLEtBQUssQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLHNCQUFXLENBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQXZCVyxRQUFBLElBQUksUUF1QmYifQ==
