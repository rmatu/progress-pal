export const createVerificationEmail = (email: string, url: string) => {
  return {
    from: "ProgressPal <progresspal.app@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Confirmation Email ✔", // Subject line
    text: `Please confirm your account by clicking this link: ${url}`, // plain text body
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          @media only screen and (max-width: 620px) {
            table[class="body"] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            table[class="body"] p,
            table[class="body"] ul,
            table[class="body"] ol,
            table[class="body"] td,
            table[class="body"] span,
            table[class="body"] a {
              font-size: 16px !important;
            }
            table[class="body"] .wrapper,
            table[class="body"] .article {
              padding: 10px !important;
            }
            table[class="body"] .content {
              padding: 0 !important;
            }
            table[class="body"] .container {
              padding: 0 !important;
              width: 100% !important;
            }
            table[class="body"] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important;
            }
            table[class="body"] .btn table {
              width: 100% !important;
            }
            table[class="body"] .btn a {
              width: 100% !important;
            }
            table[class="body"] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important;
            }
          }
          @media all {
            .ExternalClass {
              width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important;
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important;
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important;
            }
          }
        </style>
      </head>
      <body
        class=""
        style="
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        "
      >
        <span
          class="preheader"
          style="
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0;
          "
          >Verify your account</span
        >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="body"
          style="
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
            background-color: #f6f6f6;
          "
        >
          <tr>
            <td
              style="font-family: sans-serif; font-size: 14px; vertical-align: top"
            >
              &nbsp;
            </td>
            <td
              class="container"
              style="
                font-family: sans-serif;
                font-size: 14px;
                vertical-align: top;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
                width: 580px;
              "
            >
              <div
                class="content"
                style="
                  box-sizing: border-box;
                  display: block;
                  margin: 0 auto;
                  max-width: 580px;
                  padding: 10px;
                "
              >
                <table
                  class="main"
                  style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                    background: #ffffff;
                    border-radius: 3px;
                  "
                >
                  <tr>
                    <td
                      class="wrapper"
                      style="
                        font-family: sans-serif;
                        font-size: 14px;
                        vertical-align: top;
                        box-sizing: border-box;
                        padding: 20px;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          width: 100%;
                        "
                      >
                        <tr>
                          <svg
                            width="140"
                            height="38"
                            viewBox="0 0 140 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M137.652 19.2565C137.508 19.1679 137.345 19.1046 137.173 19.0701C137 19.0356 136.822 19.0307 136.647 19.0556C136.472 19.0806 136.305 19.1348 136.155 19.2154C136.005 19.2959 135.875 19.401 135.772 19.5248L128.39 28.3769C128.354 28.4172 128.31 28.4511 128.26 28.4768C128.209 28.5024 128.153 28.5193 128.095 28.5264C128.037 28.5335 127.978 28.5307 127.921 28.5182C127.864 28.5058 127.81 28.4838 127.763 28.4536L124.452 26.231C124.11 26.0006 123.715 25.8339 123.293 25.7416C122.871 25.6492 122.432 25.6331 122.002 25.6944C121.573 25.7557 121.163 25.893 120.799 26.0976C120.435 26.3021 120.125 26.5694 119.888 26.8824L116.13 31.7875C116.094 31.8335 116.048 31.8725 115.994 31.9018C115.939 31.9311 115.878 31.9501 115.815 31.9573C115.751 31.9646 115.686 31.96 115.625 31.944C115.563 31.9279 115.507 31.9007 115.458 31.8642L113.4 30.1014C113.071 29.8196 112.674 29.604 112.235 29.4703C111.797 29.3367 111.33 29.2882 110.867 29.3286C110.404 29.369 109.958 29.4971 109.56 29.7037C109.162 29.9103 108.823 30.1901 108.568 30.5229L104.183 36.2711C104.01 36.525 103.957 36.8259 104.035 37.1121C104.113 37.3983 104.317 37.6479 104.603 37.8098C104.889 37.9717 105.237 38.0335 105.575 37.9825C105.913 37.9316 106.216 37.7716 106.42 37.5357L110.805 31.7875C110.84 31.7415 110.887 31.7025 110.941 31.6732C110.995 31.6439 111.056 31.625 111.12 31.6177C111.184 31.6104 111.249 31.615 111.31 31.6311C111.371 31.6472 111.428 31.6744 111.476 31.7109L113.534 33.4736C113.863 33.7626 114.264 33.9842 114.707 34.1221C115.15 34.26 115.623 34.3106 116.092 34.2701C116.56 34.2296 117.013 34.099 117.414 33.8881C117.816 33.6773 118.157 33.3915 118.412 33.0521L122.17 28.147C122.207 28.1043 122.254 28.0685 122.308 28.0421C122.362 28.0158 122.422 27.9993 122.483 27.9937C122.546 27.984 122.61 27.9858 122.672 27.999C122.734 28.0122 122.791 28.0365 122.841 28.0704L126.152 30.293C126.485 30.5145 126.867 30.6761 127.274 30.7683C127.682 30.8605 128.107 30.8813 128.524 30.8295C128.945 30.7783 129.349 30.6531 129.711 30.4619C130.073 30.2707 130.385 30.0175 130.627 29.7182L137.965 20.866C138.068 20.7429 138.142 20.6035 138.183 20.4558C138.223 20.3081 138.229 20.155 138.2 20.0054C138.17 19.8558 138.107 19.7126 138.013 19.5841C137.919 19.4556 137.796 19.3442 137.652 19.2565V19.2565Z"
                              fill="#FE5000"
                            />
                            <path
                              d="M2.23461 21V5.38H8.79061C9.49461 5.38 10.1399 5.52667 10.7266 5.82C11.3279 6.11333 11.8413 6.502 12.2666 6.986C12.7066 7.47 13.0439 8.01267 13.2786 8.614C13.5133 9.21533 13.6306 9.83133 13.6306 10.462C13.6306 11.342 13.4326 12.1707 13.0366 12.948C12.6406 13.7253 12.0906 14.356 11.3866 14.84C10.6826 15.324 9.86128 15.566 8.92261 15.566H4.69861V21H2.23461ZM4.69861 13.388H8.76861C9.45794 13.388 10.0226 13.1093 10.4626 12.552C10.9026 11.9947 11.1226 11.298 11.1226 10.462C11.1226 9.89 11.0053 9.39133 10.7706 8.966C10.5359 8.526 10.2279 8.18133 9.84661 7.932C9.47994 7.68267 9.07661 7.558 8.63661 7.558H4.69861V13.388ZM22.1016 11.584C21.163 11.6133 20.327 11.8333 19.5936 12.244C18.875 12.64 18.3616 13.212 18.0536 13.96V21H15.6336V9.494H17.8776V12.068C18.2736 11.276 18.7943 10.6453 19.4396 10.176C20.085 9.692 20.767 9.428 21.4856 9.384C21.6176 9.384 21.735 9.384 21.8376 9.384C21.9403 9.384 22.0283 9.39133 22.1016 9.406V11.584ZM28.8388 21.22C27.6361 21.22 26.5875 20.9487 25.6928 20.406C24.8128 19.8487 24.1308 19.1227 23.6468 18.228C23.1628 17.3187 22.9208 16.3287 22.9208 15.258C22.9208 14.1873 23.1628 13.2047 23.6468 12.31C24.1455 11.4007 24.8348 10.6747 25.7148 10.132C26.6095 9.57467 27.6508 9.296 28.8388 9.296C30.0268 9.296 31.0608 9.57467 31.9408 10.132C32.8355 10.6747 33.5248 11.4007 34.0088 12.31C34.5075 13.2047 34.7568 14.1873 34.7568 15.258C34.7568 16.3287 34.5148 17.3187 34.0308 18.228C33.5468 19.1227 32.8575 19.8487 31.9628 20.406C31.0828 20.9487 30.0415 21.22 28.8388 21.22ZM25.4068 15.28C25.4068 16.0133 25.5608 16.6733 25.8688 17.26C26.1768 17.8467 26.5875 18.3087 27.1008 18.646C27.6141 18.9833 28.1935 19.152 28.8388 19.152C29.4695 19.152 30.0415 18.9833 30.5548 18.646C31.0828 18.294 31.5008 17.8247 31.8088 17.238C32.1168 16.6513 32.2708 15.9913 32.2708 15.258C32.2708 14.5247 32.1168 13.8647 31.8088 13.278C31.5008 12.6913 31.0828 12.2293 30.5548 11.892C30.0415 11.54 29.4695 11.364 28.8388 11.364C28.2081 11.364 27.6288 11.54 27.1008 11.892C26.5875 12.2293 26.1768 12.6987 25.8688 13.3C25.5608 13.8867 25.4068 14.5467 25.4068 15.28ZM41.4572 21.11C40.4158 21.11 39.4992 20.8387 38.7072 20.296C37.9298 19.7533 37.3138 19.042 36.8592 18.162C36.4192 17.2673 36.1992 16.2993 36.1992 15.258C36.1992 14.1727 36.4265 13.1753 36.8812 12.266C37.3358 11.3567 37.9592 10.638 38.7512 10.11C39.5578 9.56733 40.4892 9.296 41.5452 9.296C42.4692 9.296 43.2758 9.516 43.9652 9.956C44.6692 10.396 45.2485 10.968 45.7032 11.672V9.494H47.8372V20.67C47.8372 21.7847 47.5658 22.7307 47.0232 23.508C46.4952 24.2853 45.7692 24.8793 44.8452 25.29C43.9212 25.7007 42.8798 25.906 41.7212 25.906C40.4452 25.906 39.3818 25.686 38.5312 25.246C37.6952 24.806 36.9912 24.2047 36.4192 23.442L37.7832 22.166C38.2232 22.782 38.7878 23.2513 39.4772 23.574C40.1812 23.8967 40.9292 24.058 41.7212 24.058C42.3812 24.058 42.9898 23.9333 43.5472 23.684C44.1192 23.4493 44.5738 23.0827 44.9112 22.584C45.2485 22.0853 45.4172 21.4473 45.4172 20.67V18.91C45.0065 19.5993 44.4418 20.142 43.7232 20.538C43.0045 20.9193 42.2492 21.11 41.4572 21.11ZM42.2492 19.152C42.7332 19.152 43.1952 19.0493 43.6352 18.844C44.0752 18.624 44.4492 18.338 44.7572 17.986C45.0798 17.634 45.2998 17.26 45.4172 16.864V13.85C45.1238 13.1167 44.6618 12.5227 44.0312 12.068C43.4152 11.5987 42.7625 11.364 42.0732 11.364C41.3692 11.364 40.7605 11.5547 40.2472 11.936C39.7485 12.3173 39.3598 12.816 39.0812 13.432C38.8025 14.0333 38.6632 14.664 38.6632 15.324C38.6632 16.028 38.8172 16.6733 39.1252 17.26C39.4478 17.832 39.8805 18.294 40.4232 18.646C40.9658 18.9833 41.5745 19.152 42.2492 19.152ZM57.2071 11.584C56.2684 11.6133 55.4324 11.8333 54.6991 12.244C53.9804 12.64 53.4671 13.212 53.1591 13.96V21H50.7391V9.494H52.9831V12.068C53.3791 11.276 53.8998 10.6453 54.5451 10.176C55.1904 9.692 55.8724 9.428 56.5911 9.384C56.7231 9.384 56.8404 9.384 56.9431 9.384C57.0458 9.384 57.1338 9.39133 57.2071 9.406V11.584ZM63.9883 21.22C62.8003 21.22 61.7589 20.9487 60.8643 20.406C59.9696 19.8633 59.2729 19.1447 58.7743 18.25C58.2756 17.3407 58.0263 16.3507 58.0263 15.28C58.0263 14.1947 58.2756 13.1973 58.7743 12.288C59.2729 11.3787 59.9696 10.6527 60.8643 10.11C61.7589 9.56733 62.8076 9.296 64.0103 9.296C65.2129 9.296 66.2543 9.57467 67.1343 10.132C68.0143 10.6747 68.6889 11.3933 69.1583 12.288C69.6423 13.1827 69.8843 14.1433 69.8843 15.17C69.8843 15.5367 69.8623 15.83 69.8183 16.05H60.6003C60.6443 16.7247 60.8276 17.3187 61.1503 17.832C61.4876 18.3307 61.9056 18.7267 62.4043 19.02C62.9176 19.2987 63.4749 19.438 64.0763 19.438C64.7216 19.438 65.3303 19.2767 65.9023 18.954C66.4743 18.6313 66.8703 18.206 67.0903 17.678L69.1583 18.272C68.7623 19.1373 68.1023 19.8487 67.1783 20.406C66.2689 20.9487 65.2056 21.22 63.9883 21.22ZM60.5343 14.444H67.4863C67.4276 13.784 67.2369 13.2047 66.9143 12.706C66.5916 12.1927 66.1736 11.7967 65.6603 11.518C65.1616 11.2247 64.6043 11.078 63.9883 11.078C63.3869 11.078 62.8296 11.2247 62.3163 11.518C61.8176 11.7967 61.4069 12.1927 61.0843 12.706C60.7616 13.2047 60.5783 13.784 60.5343 14.444ZM75.9503 21.22C74.9823 21.22 74.0656 21.0587 73.2003 20.736C72.3349 20.4133 71.5943 19.944 70.9783 19.328L71.8803 17.7C72.5403 18.2867 73.2003 18.712 73.8603 18.976C74.5203 19.24 75.1876 19.372 75.8623 19.372C76.5369 19.372 77.0869 19.2473 77.5123 18.998C77.9376 18.734 78.1503 18.3527 78.1503 17.854C78.1503 17.502 78.0403 17.2307 77.8203 17.04C77.6003 16.8493 77.2776 16.6953 76.8523 16.578C76.4416 16.4607 75.9429 16.314 75.3563 16.138C74.5349 15.8887 73.8456 15.632 73.2883 15.368C72.7309 15.0893 72.3129 14.752 72.0343 14.356C71.7556 13.96 71.6163 13.454 71.6163 12.838C71.6163 11.7233 72.0343 10.858 72.8703 10.242C73.7063 9.61133 74.7989 9.296 76.1483 9.296C76.9843 9.296 77.7543 9.428 78.4583 9.692C79.1769 9.94133 79.8076 10.3373 80.3503 10.88L79.3163 12.486C78.3189 11.5767 77.2189 11.122 76.0163 11.122C75.4883 11.122 74.9969 11.2247 74.5423 11.43C74.1023 11.6353 73.8823 12.0167 73.8823 12.574C73.8823 13.0433 74.0803 13.3807 74.4763 13.586C74.8723 13.7913 75.4589 14.0113 76.2363 14.246C77.1163 14.51 77.8716 14.774 78.5023 15.038C79.1476 15.2873 79.6389 15.6173 79.9763 16.028C80.3283 16.424 80.5043 16.974 80.5043 17.678C80.5043 18.7927 80.0863 19.6653 79.2503 20.296C78.4143 20.912 77.3143 21.22 75.9503 21.22ZM86.7569 21.22C85.7889 21.22 84.8722 21.0587 84.0069 20.736C83.1416 20.4133 82.4009 19.944 81.7849 19.328L82.6869 17.7C83.3469 18.2867 84.0069 18.712 84.6669 18.976C85.3269 19.24 85.9942 19.372 86.6689 19.372C87.3436 19.372 87.8936 19.2473 88.3189 18.998C88.7442 18.734 88.9569 18.3527 88.9569 17.854C88.9569 17.502 88.8469 17.2307 88.6269 17.04C88.4069 16.8493 88.0842 16.6953 87.6589 16.578C87.2482 16.4607 86.7496 16.314 86.1629 16.138C85.3416 15.8887 84.6522 15.632 84.0949 15.368C83.5376 15.0893 83.1196 14.752 82.8409 14.356C82.5622 13.96 82.4229 13.454 82.4229 12.838C82.4229 11.7233 82.8409 10.858 83.6769 10.242C84.5129 9.61133 85.6056 9.296 86.9549 9.296C87.7909 9.296 88.5609 9.428 89.2649 9.692C89.9836 9.94133 90.6142 10.3373 91.1569 10.88L90.1229 12.486C89.1256 11.5767 88.0256 11.122 86.8229 11.122C86.2949 11.122 85.8036 11.2247 85.3489 11.43C84.9089 11.6353 84.6889 12.0167 84.6889 12.574C84.6889 13.0433 84.8869 13.3807 85.2829 13.586C85.6789 13.7913 86.2656 14.0113 87.0429 14.246C87.9229 14.51 88.6782 14.774 89.3089 15.038C89.9542 15.2873 90.4456 15.6173 90.7829 16.028C91.1349 16.424 91.3109 16.974 91.3109 17.678C91.3109 18.7927 90.8929 19.6653 90.0569 20.296C89.2209 20.912 88.1209 21.22 86.7569 21.22ZM93.6721 21V5.38H100.228C100.932 5.38 101.577 5.52667 102.164 5.82C102.765 6.11333 103.279 6.502 103.704 6.986C104.144 7.47 104.481 8.01267 104.716 8.614C104.951 9.21533 105.068 9.83133 105.068 10.462C105.068 11.342 104.87 12.1707 104.474 12.948C104.078 13.7253 103.528 14.356 102.824 14.84C102.12 15.324 101.299 15.566 100.36 15.566H96.1361V21H93.6721ZM96.1361 13.388H100.206C100.895 13.388 101.46 13.1093 101.9 12.552C102.34 11.9947 102.56 11.298 102.56 10.462C102.56 9.89 102.443 9.39133 102.208 8.966C101.973 8.526 101.665 8.18133 101.284 7.932C100.917 7.68267 100.514 7.558 100.074 7.558H96.1361V13.388ZM106.106 17.634C106.106 16.9007 106.312 16.2627 106.722 15.72C107.133 15.1627 107.705 14.7373 108.438 14.444C109.186 14.136 110.044 13.982 111.012 13.982C111.526 13.982 112.046 14.026 112.574 14.114C113.117 14.1873 113.594 14.2973 114.004 14.444V13.718C114.004 12.9113 113.762 12.2807 113.278 11.826C112.794 11.3713 112.098 11.144 111.188 11.144C110.558 11.144 109.949 11.254 109.362 11.474C108.776 11.694 108.167 12.0167 107.536 12.442L106.722 10.814C107.485 10.3153 108.248 9.94133 109.01 9.692C109.788 9.428 110.602 9.296 111.452 9.296C112.992 9.296 114.202 9.70667 115.082 10.528C115.977 11.3347 116.424 12.486 116.424 13.982V18.272C116.424 18.5507 116.468 18.7487 116.556 18.866C116.659 18.9833 116.828 19.0493 117.062 19.064V21C116.842 21.044 116.644 21.0733 116.468 21.088C116.292 21.1027 116.146 21.11 116.028 21.11C115.5 21.11 115.104 20.9853 114.84 20.736C114.591 20.472 114.444 20.1787 114.4 19.856L114.334 19.196C113.836 19.8413 113.198 20.34 112.42 20.692C111.643 21.044 110.858 21.22 110.066 21.22C109.304 21.22 108.622 21.066 108.02 20.758C107.419 20.4353 106.95 20.0027 106.612 19.46C106.275 18.9173 106.106 18.3087 106.106 17.634ZM113.432 18.338C113.814 17.9567 114.004 17.5973 114.004 17.26V15.94C113.139 15.6173 112.259 15.456 111.364 15.456C110.484 15.456 109.766 15.6393 109.208 16.006C108.666 16.358 108.394 16.8347 108.394 17.436C108.394 17.9347 108.592 18.3967 108.988 18.822C109.399 19.2327 109.986 19.438 110.748 19.438C111.262 19.438 111.76 19.3353 112.244 19.13C112.728 18.9247 113.124 18.6607 113.432 18.338ZM119.382 4.94H121.802V17.678C121.802 18.2647 121.89 18.6387 122.066 18.8C122.242 18.9613 122.462 19.042 122.726 19.042C123.02 19.042 123.298 19.0127 123.562 18.954C123.826 18.8953 124.046 18.822 124.222 18.734L124.574 20.648C124.222 20.7947 123.804 20.9193 123.32 21.022C122.836 21.1247 122.404 21.176 122.022 21.176C121.201 21.176 120.556 20.9487 120.086 20.494C119.617 20.0247 119.382 19.3793 119.382 18.558V4.94Z"
                              fill="black"
                            />
                          </svg>
                          <td
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                            "
                          >
                            <br />
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >
                              Welcome to <b style="color: #fe5000">ProgressPal</b>
                            </p>
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >
                              Please take a moment and validate your email to
                              confirm your account.
                            </p>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="btn btn-primary"
                              style="
                                border-collapse: separate;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                width: 100%;
                                box-sizing: border-box;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-family: sans-serif;
                                      font-size: 14px;
                                      vertical-align: top;
                                      padding-bottom: 15px;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        border-collapse: separate;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        width: auto;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              font-family: sans-serif;
                                              font-size: 14px;
                                              vertical-align: top;
                                              background-color: #fe5000;
                                              border-radius: 5px;
                                              text-align: center;
                                            "
                                          >
                                            <a
                                              href="${url}"
                                              target="_blank"
                                              style="
                                                display: inline-block;
                                                color: #ffffff;
                                                background-color: #fe5000;
                                                border: solid 1px #fe5000;
                                                border-radius: 5px;
                                                box-sizing: border-box;
                                                cursor: pointer;
                                                text-decoration: none;
                                                font-size: 14px;
                                                font-weight: bold;
                                                margin: 0;
                                                padding: 12px 25px;
                                                text-transform: capitalize;
                                                border-color: #fe5000;
                                              "
                                              >Verify Email</a
                                            >
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >
                              If you're having trouble clicking the "Verify Email"
                              button, copy and paste the URL below into your web
                              browser: <a href="${url}">${url}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div
                  class="footer"
                  style="
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      border-collapse: separate;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      width: 100%;
                    "
                  >
                    <tr>
                      <td
                        class="content-block powered-by"
                        style="
                          font-family: sans-serif;
                          vertical-align: top;
                          padding-bottom: 10px;
                          padding-top: 10px;
                          font-size: 12px;
                          color: #999999;
                          text-align: center;
                        "
                      >
                        Made with ❤️ by
                        <a
                          href="https://github.com/rmatu"
                          style="
                            color: #999999;
                            font-size: 12px;
                            text-align: center;
                            text-decoration: none;
                          "
                          >Ryszard Matula</a
                        >.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
                <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td
              style="font-family: sans-serif; font-size: 14px; vertical-align: top"
            >
              &nbsp;
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
};

export const createResetPasswordEmail = (email: string, url: string) => {
  return {
    from: "ProgressPal <progresspal.app@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: `Click this link to reset your password ${url}`, // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };
};
