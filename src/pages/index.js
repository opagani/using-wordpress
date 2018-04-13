import React from 'react'
import Link from 'gatsby-link'

import Img from 'gatsby-image'

const IndexPage = ( { data } ) => {
  return (
    <div>
      <h1>Pages</h1>
      {data.allWordpressPage.edges.map(({ node }) =>
        <div>
          <h3 style={{ color: 'blue' }}>{node.title}</h3>
          <p>{node.date}</p>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>    
      )}

      <h1>Posts</h1>
      {data.allWordpressPost.edges.map(({ node }) =>
        <div>
          <h3 style={{ color: 'blue' }}>{node.title}</h3>
          <p>{node.date}</p>
          <div dangerouslySetInnerHTML={{ __html: node.content }} />
          {node.childWordPressAcfImageGallery ? (
              <Img resolutions={
                node.childWordPressAcfImageGallery.pictures[1].picture
                  .localFile.childImageSharp.img1_resolutions
                }
              />
            ) : null}
          {node.childWordPressAcfImageGallery ? (
              <Img resolutions={
                node.childWordPressAcfImageGallery.pictures[1].picture
                  .localFile.childImageSharp.img2_resolutions
                }
              />
            ) : null}
        </div>    
      )}
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query BlogPostWordpress {
    allWordpressPost {
      edges {
        node {
          title
          date(formatString: "MMMM DD YYYY")
          content
          childWordPressAcfImageGallery {
            id
            pictures {
              title
              picture {
                localFile {
                  childImageSharp {
                    img1_resolutions: resolutions(width: 400, height: 400) {
                      ...GatsbyImageSharpResolutions
                    }
                    img2_resolutions: resolutions(width: 200, height: 200) {
                      ...GatsbyImageSharpResolutions_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;