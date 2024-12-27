"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fetchDashboardMetaData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let metaData;
    switch (user === null || user === void 0 ? void 0 : user.role) {
        case client_1.UserRole.SUPER_ADMIN:
            metaData = getSuperAdminMetaData();
            break;
        case client_1.UserRole.ADMIN:
            metaData = getAdminMetaData();
            break;
        case client_1.UserRole.USER:
            metaData = getUserMetaData(user);
            break;
        default:
            throw new Error("Invalid user role!");
    }
    return metaData;
});
const getSuperAdminMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const userCount = yield prisma_1.default.user.count();
    const petCount = yield prisma_1.default.pet.count();
    const adoptionCount = yield prisma_1.default.adoptionRequest.count();
    const blogCount = yield prisma_1.default.blog.count();
    const donationCount = yield prisma_1.default.donation.count();
    const totalRevenue = adoptionCount * 180;
    const barChartData = yield getBarChartData();
    const pieCharData = yield getPieChartData();
    return {
        userCount,
        petCount,
        adoptionCount,
        blogCount,
        donationCount,
        totalRevenue,
        barChartData,
        pieCharData,
    };
});
const getAdminMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminCount = yield prisma_1.default.user.count({
        where: {
            role: "ADMIN"
        }
    });
    const userCount = yield prisma_1.default.user.count({
        where: {
            role: "USER"
        }
    });
    const petCount = yield prisma_1.default.pet.count();
    const popularPetCount = yield prisma_1.default.pet.count({
        where: {
            adoptionRequest: {
                some: {},
            },
        },
    });
    const adoptionCount = yield prisma_1.default.adoptionRequest.count();
    const blogCount = yield prisma_1.default.blog.count();
    const donationCount = yield prisma_1.default.donation.count();
    const totalRevenue = (yield prisma_1.default.adoptionRequest.count(
    //   {
    //   _sum: { amount: true },
    //   where: {
    //     status: PaymentStatus.PAID,
    //   },
    // }
    )) * 180;
    const barChartData = yield getBarChartData();
    const pieCharData = yield getPieChartData();
    return {
        userCount,
        adminCount,
        petCount,
        popularPetCount,
        adoptionCount,
        blogCount,
        donationCount,
        totalRevenue,
        barChartData,
        pieCharData,
    };
});
const getUserMetaData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const petCount = yield prisma_1.default.pet.count();
    const adoptionCount = yield prisma_1.default.adoptionRequest.count({
        where: {
            userId: userData.id,
        },
    });
    const totalRevenue = (yield prisma_1.default.adoptionRequest.count({
        where: {
            userId: userData.id,
        },
    })) * 180;
    const blogCount = yield prisma_1.default.blog.count({
        where: {
            userId: userData.id,
        },
    });
    const donationCount = yield prisma_1.default.donation.count({
        where: {
            userId: userData.id,
        },
    });
    const barChartData = yield getUserBarChartData(userData === null || userData === void 0 ? void 0 : userData.id);
    const pieCharData = yield getUserPieChartData(userData === null || userData === void 0 ? void 0 : userData.id);
    return {
        petCount,
        adoptionCount,
        blogCount,
        donationCount,
        totalRevenue,
        barChartData,
        pieCharData
    };
});
const getBarChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const adoptionCountByMonth = yield prisma_1.default.$queryRaw `
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "adoptionrequests"
        GROUP BY month
        ORDER BY month ASC
    `;
    return adoptionCountByMonth;
});
const getPieChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const adoptionStatusDistribution = yield prisma_1.default.adoptionRequest.groupBy({
        by: ["status"],
        _count: { id: true },
    });
    const formattedAdoptStatusDistribution = adoptionStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id),
    }));
    return formattedAdoptStatusDistribution;
});
const getUserBarChartData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const adoptionCountByMonth = yield prisma_1.default.$queryRaw `
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "adoptionrequests"
        WHERE "userId" = ${userId}
        GROUP BY month
        ORDER BY month ASC
    `;
    return adoptionCountByMonth;
});
const getUserPieChartData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const adoptionStatusDistribution = yield prisma_1.default.adoptionRequest.groupBy({
        by: ["status"],
        _count: { id: true },
        where: {
            userId,
        },
    });
    const formattedAdoptStatusDistribution = adoptionStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id),
    }));
    return formattedAdoptStatusDistribution;
});
exports.MetaService = {
    fetchDashboardMetaData,
};
