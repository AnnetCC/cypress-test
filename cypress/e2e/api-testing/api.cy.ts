// @ts-ignore
import posts from '../../fixtures/posts/posts.json';

describe('Test API', () => {

    const id = 1;
    it('should have post with valid id', () => {
        cy.verifyRequest({
            'url': `/posts/${id}`,
            'method': 'GET',
        }, 200).should('deep.include', {id: id});
    });

    it('should return valid length of posts', () => {
        cy.verifyRequest({
            'url': `/posts/`,
            'method': 'GET',
        }, 200).should('have.length', 100);
    });

    it('should return valid fields for all posts', () => {
        cy.verifyRequest({
            'url': `/posts/`,
            'method': 'GET',
        }, 200).each(post => {
            cy.wrap(post).should('have.all.keys', ['userId', 'id', 'title', 'body']);
        });
    });

    it('should post new object', () => {
        const post = posts[0];
        cy.verifyRequest({
            'url': `/posts`,
            'method': 'POST',
            body: post,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }, 201).should('deep.equal', post);
    });

    it('should update objects', () => {
        cy.wrap(posts.slice(1, 6)).each((post, index) => {
            cy.verifyRequest({
                'url': `/posts/${index + 1}`,
                'method': 'PUT',
                body: post,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }, 200).then(body => {
                cy.wrap(body).should('deep.include', post);
            });
        });
    });

    it('should delete object by id', () => {
        cy.verifyRequest({
            'url': `/posts/${id}`,
            'method': 'DELETE',
        }, 200).should('be.empty');
    });

    /*
     Negative tests
    */
   [0, -100, 1100, NaN, 'string'].forEach(value => {
        it(`should throw error message with id as "${value}" and method as "GET"`, () => {
            cy.verifyRequest({
                'url': `/posts/${value}`,
                'method': 'GET',
                failOnStatusCode: false,
            }, 404, true);
        });

        it(`should throw error message with id as "${value}" and method as "POST"`, () => {
            cy.verifyRequest({
                'url': `/posts/${value}`,
                'method': 'POST',
                body: posts[0],
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                failOnStatusCode: false,
            }, 404, true);
        });

            it(`should throw error message with id as "${value}" and method as "PUT"`, () => {
                cy.verifyRequest({
                    'url': `/posts/${value}`,
                    'method': 'PUT',
                    body: posts[0],
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    failOnStatusCode: false,
                }, 500, true);
            });
    });

    it(`should throw error message with PUT method with invalid field"`, () => {
        cy.verifyRequest({
            'url': `/posts/`,
            'method': 'PUT',
            body: posts[6],
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            failOnStatusCode: false,
        }, 404, true);
    });
});
