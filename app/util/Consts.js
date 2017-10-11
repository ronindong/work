"use strict";
import React, {Component} from 'react';

const ROOT_ADDRESS_DEV = 'http://172.16.8.111:8082';
const ROOT_ADDRESS_TEST = '';
const ROOT_ADDRESS_RELEASE = '';

const HTTP_LOGIN_URL = '/cig_DataInterface_web/interface/indexController/userLogin';

class Consts extends Component {

     HTTP_MOVIE_URL = 'http://api.douban.com/v2/movie/top250';

}

export {Consts as default};

