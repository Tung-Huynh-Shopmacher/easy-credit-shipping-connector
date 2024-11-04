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
Object.defineProperty(exports, '__esModule', { value: true });
exports.createCustomObject = createCustomObject;
exports.deleteCustomObject = deleteCustomObject;
const CONTAINER = 'application-settings';
const CUSTOM_OBJECT_KEY = 'application-settings-object';
function createCustomObject(apiRoot, applicationUrl) {
  return __awaiter(this, void 0, void 0, function* () {
    const {
      body: { results: customObjects },
    } = yield apiRoot
      .customObjects()
      .withContainer({ container: CONTAINER })
      .get({
        queryArgs: {
          where: `key = "${CUSTOM_OBJECT_KEY}"`,
        },
      })
      .execute();
    if (customObjects.length > 0) {
      const customObject = customObjects[0];
      yield apiRoot
        .extensions()
        .withKey({ key: CUSTOM_OBJECT_KEY })
        .delete({
          queryArgs: {
            version: customObject.version,
          },
        })
        .execute();
    }
    yield apiRoot
      .customObjects()
      .post({
        body: {
          key: CUSTOM_OBJECT_KEY,
          container: CONTAINER,
          value: {
            'webhook-url': applicationUrl,
          },
        },
      })
      .execute();
  });
}
function deleteCustomObject(apiRoot) {
  return __awaiter(this, void 0, void 0, function* () {
    const {
      body: { results: customObjects },
    } = yield apiRoot
      .customObjects()
      .withContainer({ container: CONTAINER })
      .get({
        queryArgs: {
          where: `key = "${CUSTOM_OBJECT_KEY}"`,
        },
      })
      .execute();
    if (customObjects.length > 0) {
      yield apiRoot
        .customObjects()
        .withContainerAndKey({ container: CONTAINER, key: CUSTOM_OBJECT_KEY })
        .delete()
        .execute();
    }
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLGdEQTBDQztBQUVELGdEQXNCQztBQXJFRCxNQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztBQUN6QyxNQUFNLGlCQUFpQixHQUFHLDZCQUE2QixDQUFDO0FBRXhELFNBQXNCLGtCQUFrQixDQUN0QyxPQUFtQyxFQUNuQyxjQUFzQjs7UUFFdEIsTUFBTSxFQUNKLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FDakMsR0FBRyxNQUFNLE9BQU87YUFDZCxhQUFhLEVBQUU7YUFDZixhQUFhLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDdkMsR0FBRyxDQUFDO1lBQ0gsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxVQUFVLGlCQUFpQixHQUFHO2FBQ3RDO1NBQ0YsQ0FBQzthQUNELE9BQU8sRUFBRSxDQUFDO1FBRWIsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QyxNQUFNLE9BQU87aUJBQ1YsVUFBVSxFQUFFO2lCQUNaLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2lCQUNuQyxNQUFNLENBQUM7Z0JBQ04sU0FBUyxFQUFFO29CQUNULE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTztpQkFDOUI7YUFDRixDQUFDO2lCQUNELE9BQU8sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sT0FBTzthQUNWLGFBQWEsRUFBRTthQUNmLElBQUksQ0FBQztZQUNKLElBQUksRUFBRTtnQkFDSixHQUFHLEVBQUUsaUJBQWlCO2dCQUN0QixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFO29CQUNMLGFBQWEsRUFBRSxjQUFjO2lCQUM5QjthQUNGO1NBQ0YsQ0FBQzthQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2YsQ0FBQztDQUFBO0FBRUQsU0FBc0Isa0JBQWtCLENBQ3RDLE9BQW1DOztRQUVuQyxNQUFNLEVBQ0osSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUNqQyxHQUFHLE1BQU0sT0FBTzthQUNkLGFBQWEsRUFBRTthQUNmLGFBQWEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUN2QyxHQUFHLENBQUM7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFVBQVUsaUJBQWlCLEdBQUc7YUFDdEM7U0FDRixDQUFDO2FBQ0QsT0FBTyxFQUFFLENBQUM7UUFFYixJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0IsTUFBTSxPQUFPO2lCQUNWLGFBQWEsRUFBRTtpQkFDZixtQkFBbUIsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLENBQUM7aUJBQ3JFLE1BQU0sRUFBRTtpQkFDUixPQUFPLEVBQUUsQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0NBQUEifQ==
