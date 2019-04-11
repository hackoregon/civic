# Mock Wrapper

Mock Wrapper is used by project packages to emulate the interface between year packages and project packages. Project packages are expected
to export Routes, Reducers, and an App component. By using the Mock Wrapper in conjunction with the Dev Server, interoperability with a year
package becomes straightforward.

In addition to ensuring a project package is structured correctly, the Mock Wrapper gets consumed by the Dev Server to create a standalone
web experience for an individual project package. This way a single project can be iterated on in isolation.
